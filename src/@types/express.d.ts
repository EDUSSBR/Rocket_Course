declare namespace Express {
  export interface Request {
    query?
    file?
    files?
    params?
    user?: {
      id: string
    }
  }
  declare namespace Multer {
    export interface File{
      file?
    }
  }
}
