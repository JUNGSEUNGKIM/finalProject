package com.example.finalproject.domain.board;

import java.util.List;

public class Comment {

        private String comment_id;
        private String boarder_code;
        private String content;
        private String user_id;
        private String create_at;
        private String parent_comment_id;
        private List<Comment> children;

        private String id;

        /*
            domain에서 특정 변수가 데이터베이스와 매핑하는 값이 아니라
            코드에서 동적으로 구성되는 값일 경우에
            매핑에서 제외시켜줘야하 한다
            * 방법 1 :@Transient 어노테이션은 이 필드가 데이터베이스 컬럼과 매핑되지 않아야 함을 나타냅니다.
                        이렇게 하면 MyBatis가 이 필드를 무시하고, 나머지 6개 필드만 매핑하게 됩니다.
                 ex) @Transient
                     private List<Comment> children;
            * 방법 2: 생성자를 두개 만들어줘야 한다
         */

        public Comment(String id, String comment_id, String boarder_code, String content, String user_id, String create_at, String parent_comment_id) {
            this.comment_id = comment_id;
            this.boarder_code = boarder_code;
            this.content = content;
            this.user_id = user_id;
            this.create_at = create_at;
            this.parent_comment_id = parent_comment_id;
            this.id = id;

        }
        public Comment(List<Comment> children, String comment_id, String boarder_code, String content, String user_id, String create_at, String parent_comment_id) {
            this.comment_id = comment_id;
            this.boarder_code = boarder_code;
            this.content = content;
            this.user_id = user_id;
            this.create_at = create_at;
            this.parent_comment_id = parent_comment_id;
            this.children = children;
        }

        public Comment(){}

        public String getId(){return id;}

        public void setId(String id){this.id = id;}

        public List<Comment> getChildren() {
            return children;
        }

        public void setChildren(List<Comment> children) {
            this.children = children;
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


}
