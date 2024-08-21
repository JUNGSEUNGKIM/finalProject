package com.example.finalproject.service.function;

import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

public class SaveFile {
    public static Map<String,String> saveFileFunc(MultipartFile[] files){
        List<String> imagePaths = new ArrayList<>();
        List<String> imageNames = new ArrayList<>();


        for (MultipartFile file : files) {
            try {
                String imageName = UUID.randomUUID().toString();
                String imagePath = saveFile(file.getInputStream(), imageName);
                imagePaths.add(imagePath);
                imageNames.add(imageName);
            } catch (IOException e) {
                e.printStackTrace(); // 예외 처리
            }
        }
        String combinedImageNames = String.join(";", imageNames);
        String combinedImagePaths = String.join(";", imagePaths);

        Map<String, String> result = new HashMap<>();
        result.put("name",combinedImageNames);
        result.put("path", combinedImagePaths);

        return result;
    }

     public static String saveFile(InputStream inputStream, String path) throws IOException {
        // Implement file saving logic
        Path currentPath = Paths.get("");
        String currentDirectory = currentPath.toAbsolutePath().toString()+"/uploads/";
        Path filePath = Paths.get(currentDirectory, path);

        try (OutputStream outputStream = new FileOutputStream(filePath.toFile())) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        } finally {
            // InputStream 닫기
            inputStream.close();
        }
        return filePath.toString();
    }
}
