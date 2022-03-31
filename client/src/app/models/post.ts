export class Post {
    private _id:number;
    private _userId:number;
    private _topicId:number;
    private _name:string;
    private _content:string;
    private _creationDate:Date;
    private _commentCount: number;

    constructor(id:number, userId:number, topicId:number, name:string, content:string, commentCount:number, creationDate:Date) {
        this._id = id;
        this._userId = userId;
        this._topicId = topicId;
        this._name = name;
        this._content  = content;
        this._commentCount = commentCount;
        this._creationDate = creationDate;
    }

    public get id():number {
        return this._id;
    }

    public get userId():number {
        return this._userId;
    }

    public get topicId():number {
        return this._topicId;
    }

    public get name():string {
        return this._name;
    }

    public set name(value:string) {
        this._name = value;
    }

    public get content():string {
        return this._content;
    }

    public set content(value:string) {
        this._content = value;
    }

    public get commentCount(): number {
        return this._commentCount;
    }

    public set commentCount(value: number) {
        this._commentCount = value;
    }

    public get creationDate():Date {
        return this._creationDate;
    }
}
