export class Post {
    private _id:number;
    private _userId:number;
    private _name:string;
    private _content:string;
    private _creationDate:Date;

    constructor(id:number, userId:number, name:string, content:string, creationDate:Date) {
        this._id = id;
        this._userId = userId;
        this._name = name;
        this._content  = content;
        this._creationDate = creationDate;
    }

    public get id():number {
        return this._id;
    }

    public get userId():number {
        return this._userId;
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

    public get creationDate():Date {
        return this.creationDate;
    }
}