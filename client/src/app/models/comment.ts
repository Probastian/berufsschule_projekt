export class Comment {
    private _id:number;
    private _user_id:number;
    private _text:string;
    private _creationDate:Date;

    constructor(id:number, user_id:number, text:string, creationDate:Date) {
        this._id = id;
        this._user_id = user_id;
        this._text = text;
        this._creationDate = creationDate;
    }

    public get id():number {
        return this._id;
    }

    public get user_id():number {
        return this._user_id;
    }

    public get text():string {
        return this._text;
    }

    public get creationDate():Date {
        return this._creationDate;
    }
}