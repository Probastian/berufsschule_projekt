export class Topic {
    private _id:number;
    private _name:string;
    private _description:string;
    private _creator:number;

    constructor(id:number, name:string, description:string, creator:number) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._creator = creator;
    }

    public get id():number {
        return this._id;
    }

    public get name():string {
        return this._name;
    }

    public set name(value:string) {
        this._name = value;
    }

    public get description():string {
        return this._description;
    }

    public set description(value:string) {
        this._description = value;
    }

    public get creator():number {
        return this._creator;
    }
}