package com.example.backend.repositories;

import com.example.backend.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByOwnerEmail(String ownerEmail);
}
