package com.example.backend.controllers;

import com.example.backend.models.Recipe;
import com.example.backend.models.User;
import com.example.backend.repositories.RecipeRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.FileStorageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public RecipeController(RecipeRepository recipeRepository, UserRepository userRepository, FileStorageService fileStorageService) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    // Map a Recipe entity into a JSON-friendly structure with deserialized dataJson
    private Object mapRecipe(Recipe r) {
        try {
            Map<String, Object> result = new HashMap<>();
            result.put("id", r.getId());
            result.put("_id", r.getId() != null ? r.getId().toString() : null);
            // parse dataJson if present
            Map<String, Object> parsed = null;
            if (r.getDataJson() != null && !r.getDataJson().isEmpty()) {
                try {
                    parsed = objectMapper.readValue(r.getDataJson(), Map.class);
                } catch (Exception ex) {
                    parsed = null;
                }
            }
            // name/title
            Object name = parsed != null ? parsed.get("name") : null;
            if (name == null) name = r.getTitle();
            result.put("name", name);
            // description
            Object desc = parsed != null ? parsed.get("description") : null;
            if (desc == null) desc = r.getDescription();
            result.put("description", desc);
            // ingredients
            Object ingredients = parsed != null ? parsed.get("ingredients") : null;
            result.put("ingredients", ingredients != null ? ingredients : new ArrayList<>());
            // procedure
            Object procedure = parsed != null ? parsed.get("procedure") : null;
            result.put("procedure", procedure != null ? procedure : "");
            // cookingTime
            Object cookingTime = parsed != null ? parsed.get("cookingTime") : null;
            result.put("cookingTime", cookingTime != null ? cookingTime : Map.of("hours",0,"minutes",0));
            // servings
            Object servings = parsed != null ? parsed.get("servings") : null;
            result.put("servings", servings != null ? servings : r.getOwnerEmail());
            // imagePath and image (if any)
            result.put("imagePath", r.getImagePath());
            result.put("image", parsed != null ? parsed.get("image") : null);
            result.put("ownerEmail", r.getOwnerEmail());
            return result;
        } catch (Exception e) {
            return r;
        }
    }

    private Optional<User> userFromAuth(String auth) {
        if (auth == null || !auth.startsWith("Bearer ")) return Optional.empty();
        String token = auth.substring(7);
        return userRepository.findByToken(token);
    }

    @PostMapping("")
    public ResponseEntity<?> postRecipe(@RequestHeader(value = "Authorization", required = false) String auth,
                                        @RequestPart(value = "image", required = false) MultipartFile image,
                                        @RequestPart("data") String data) {
        Optional<User> u = userFromAuth(auth);
        if (u.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        try {
            Map<String, Object> map = objectMapper.readValue(data, Map.class);
            Recipe r = new Recipe();
            r.setTitle((String) map.getOrDefault("title", ""));
            r.setDescription((String) map.getOrDefault("description", ""));
            r.setDataJson(data);
            String filename = fileStorageService.store(image);
            if (filename != null) {
                r.setImagePath(filename);
            }
            r.setOwnerEmail(u.get().getEmail());
            recipeRepository.save(r);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid data");
        }
    }

    @GetMapping("/myRecipes")
    public ResponseEntity<?> myRecipes(@RequestHeader(value = "Authorization", required = false) String auth) {
        Optional<User> u = userFromAuth(auth);
        if (u.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        List<Recipe> list = recipeRepository.findByOwnerEmail(u.get().getEmail());
        List<Object> mapped = list.stream().map(this::mapRecipe).toList();
        return ResponseEntity.ok(mapped);
    }

    // Temporary debug endpoint - lists all recipes without auth
    @GetMapping("/all")
    public ResponseEntity<?> allRecipes() {
        List<Recipe> list = recipeRepository.findAll();
        List<Object> mapped = list.stream().map(this::mapRecipe).toList();
        return ResponseEntity.ok(mapped);
    }

    @GetMapping("/recipe")
    public ResponseEntity<?> getRecipe(@RequestParam("recipeID") Long recipeID) {
        Optional<Recipe> r = recipeRepository.findById(recipeID);
        if (r.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(mapRecipe(r.get()));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteRecipe(@RequestHeader(value = "Authorization", required = false) String auth,
                                          @RequestParam("recipeID") Long recipeID) {
        Optional<User> u = userFromAuth(auth);
        if (u.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        Optional<Recipe> r = recipeRepository.findById(recipeID);
        if (r.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        if (!Objects.equals(r.get().getOwnerEmail(), u.get().getEmail())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        recipeRepository.deleteById(recipeID);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateRecipe(@RequestHeader(value = "Authorization", required = false) String auth,
                                          @RequestPart(value = "image", required = false) MultipartFile image,
                                          @RequestPart("data") String data,
                                          @RequestParam("recipeID") Long recipeID) {
        Optional<User> u = userFromAuth(auth);
        if (u.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        Optional<Recipe> existing = recipeRepository.findById(recipeID);
        if (existing.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        Recipe r = existing.get();
        if (!Objects.equals(r.getOwnerEmail(), u.get().getEmail())) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        try {
            Map<String, Object> map = objectMapper.readValue(data, Map.class);
            r.setTitle((String) map.getOrDefault("title", r.getTitle()));
            r.setDescription((String) map.getOrDefault("description", r.getDescription()));
            r.setDataJson(data);
            String filename = fileStorageService.store(image);
            if (filename != null) r.setImagePath(filename);
            recipeRepository.save(r);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid data");
        }
    }
}
