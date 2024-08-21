package com.example.finalproject.domain.store;

import java.util.List;

public class StoreComment {
    private String id;
    private String comment_id;
    private String boarder_code;
    private String content;
    private String user_id;
    private String create_at;
    private String parent_comment_id;
    private String starrating;
    private List<StoreComment> children;
    public StoreComment(){}

    public StoreComment(String id, String comment_id, String boarder_code, String content, String user_id, String create_at, String parent_comment_id, String starrating, List<StoreComment> children) {
        this.id = id;
        this.comment_id = comment_id;
        this.boarder_code = boarder_code;
        this.content = content;
        this.user_id = user_id;
        this.create_at = create_at;
        this.parent_comment_id = parent_comment_id;
        this.starrating = starrating;
        this.children = children;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getComment_id() {
        return comment_id;
    }

    public void setComment_id(String comment_id) {
        this.comment_id = comment_id;
    }

    public String getBoarder_code() {
        return boarder_code;
    }

    public void setBoarder_code(String boarder_code) {
        this.boarder_code = boarder_code;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getCreate_at() {
        return create_at;
    }

    public void setCreate_at(String create_at) {
        this.create_at = create_at;
    }

    public String getParent_comment_id() {
        return parent_comment_id;
    }

    public void setParent_comment_id(String parent_comment_id) {
        this.parent_comment_id = parent_comment_id;
    }

    public String getStarrating() {
        return starrating;
    }

    public void setStarrating(String starrating) {
        this.starrating = starrating;
    }

    public List<StoreComment> getChildren() {
        return children;
    }

    public void setChildren(List<StoreComment> children) {
        this.children = children;
    }
}
