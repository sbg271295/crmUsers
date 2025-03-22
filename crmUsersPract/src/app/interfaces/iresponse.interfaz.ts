import { IUsers } from "./iusers.interface";

export interface IResponse {
  "page": number,
  "per_page": number,
  "total": number,
  "total_pages": number,
  "results": IUsers[]
}
