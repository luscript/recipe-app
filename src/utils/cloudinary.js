import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dtofunpbl', 
  api_key: '357838497218239', 
  api_secret: 'd5ECdvwKwT29DiwJogKVa1jxfRM' 
});

export async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'recipes'
    });
}

export async function deleteImage(imageID) { 
    return await cloudinary.uploader.destroy(imageID);
}