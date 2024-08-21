package com.example.finalproject.domain.store;

public class StoreMain {
    private String boarder_code;
    private String imagepath;
    private String image_name;
    private String title;
    private String content;
    private String tourprice;
    private String location;
    private String comments_count;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    private String id;

    public StoreMain(String boarder_code, String imagepath, String image_name, String title, String content, String tourprice, String location, String comments_count, String id) {
        this.boarder_code = boarder_code;
        this.imagepath = imagepath;
        this.image_name = image_name;
        this.title = title;
        this.content = content;
        this.tourprice = tourprice;
        this.location = location;
        this.comments_count = comments_count;
        this.id = id;
    }

    public StoreMain(){};

    public StoreMain(String boarder_code, String imagepath, String image_name, String title, String content, String tourprice, String location, String comments_count) {
        this.boarder_code = boarder_code;
        this.imagepath = imagepath;
        this.image_name = image_name;
        this.title = title;
        this.content = content;
        this.tourprice = tourprice;
        this.location = location;
        this.comments_count = comments_count;
    }

    public String getBoarder_code() {
        return boarder_code;
    }

    public void setBoarder_code(String boarder_code) {
        this.boarder_code = boarder_code;
    }

    public String getImagepath() {
        return imagepath;
    }

    public void setImagepath(String imagepath) {
        this.imagepath = imagepath;
    }

    public String getImage_name() {
        return image_name;
    }

    public void setImage_name(String image_name) {
        this.image_name = image_name;
    }

    public String getTitle () {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTourprice() {
        return tourprice;
    }

    public void setTourprice(String tourprice) {
        this.tourprice = tourprice;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getComments_count() {
        return comments_count;
    }

    public void setComments_count(String comments_count) {
        this.comments_count = comments_count;
    }

}
