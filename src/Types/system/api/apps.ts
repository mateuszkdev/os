import { Request, Response } from 'express';

export interface AppArgs {
    req: Request | any
    res: Response
}

export interface App {

    name: string
    get?: ({}: AppArgs) => Promise<void>
    post?: ({}: AppArgs) => Promise<void>

}