import { HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json"
  })
};

export default httpOptions;
