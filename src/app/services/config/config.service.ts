import { Injectable } from '@angular/core';
import * as envJson from '../../../config/env.json';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  _window = <any>window;
  constructor() {
    this._window.ENVIRONMENT_PARAMETERS = envJson.default;
  }

}
