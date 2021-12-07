import { Method } from 'axios';
import { ActionParameters } from './Interfaces/ActionParameters';
import { HttpRequest } from './NetworkRequests/HttpRequest';
import { ActionMessageInterface } from './Interfaces/ActionMessageInterface';
import { EventObserver } from './NetworkRequests/SocketConnection/Observer';

const observer: EventObserver = EventObserver.getInstance();

export class ActionMessage implements ActionMessageInterface {
  serviceName: string;
  modelName: string;
  actionName: string;
  httpMethod: Method;
  httpRequest: HttpRequest;
  actionParameters?: ActionParameters;

  constructor(
    microserviceName: string,
    actionName: string,
    modelName: string,
    actionParameters?: ActionParameters
  ) {
    this.serviceName = microserviceName;
    this.modelName = modelName;
    this.actionName = actionName;
    this.actionParameters = actionParameters;
    this.httpMethod = 'POST';
    this.httpRequest = new HttpRequest();
  }

  axiosConnect(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpRequest
        .axiosConnect(
          this.serviceName,
          this.modelName,
          this.actionName,
          this.httpMethod,
          this.actionParameters
        )
        .then((response: any) => {
          resolve(response.data.action_result.data);
        })
        .catch((error) => {
          reject(error.data.action_error ? error.data.action_error : error);
        });
    });
  }
}
