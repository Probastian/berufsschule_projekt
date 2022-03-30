export class User {
    private _id: number;
    private _username: string;
    private _email: string;
    private _firstname: string;
    private _lastname: string;
    private _joinDate: Date;
    private _isAdmin: boolean;

    constructor(id:number, username:string, email:string, firstname:string, lastname:string, joinDate:Date, isAdmin:boolean) {
        this._id = id;
        this._username = username;
        this._email = email;
        this._firstname = firstname;
        this._lastname = lastname;
        this._joinDate = joinDate;
        this._isAdmin = isAdmin;
    }

    public get id(): number {
        return this._id;
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get firstname(): string {
        return this._firstname;
    }

    public set firstname(value: string) {
        this._firstname = value;
    }

    public get lastname(): string {
        return this._lastname;
    }

    public set lastname(value: string) {
        this._lastname = value;
    }

    public get joinDate(): Date {
        return this._joinDate;
    }

    public set joinDate(value: Date) {
        this._joinDate = value;
    }

    public get isAdmin(): boolean {
        return this._isAdmin;
    }
}
