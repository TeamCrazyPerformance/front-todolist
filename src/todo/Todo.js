export default class Todo{
    constructor(id, content) {
        this._content = content;
        this._id = id;
    }

    get id() {
        return this._id;
    }

    get content() {
        return this._content;
    }

    set updateContent(content) {
        if (content === "") {
            alert("내용을 입력해주세요");
            return;
        }
        this._content = content;
    }
}