import { v4 as uuidv4 } from 'uuid';
import { ActionParameters } from '../Interfaces/ActionParameters';
import { RoutingKeyParams } from '../Interfaces/RoutingKeyParams';
import { ActionResult } from '../ActionResponses/ActionResult';
import { ActionError } from '../ActionResponses/ActionError';
import { GenerateJSON } from './GenerateJSON';
// import { EventObserver } from './SocketConnection/Observer';
import { GlobalVariables } from '../../GlobalVariables';
// @ts-ignore
import { Stomp } from 'stompjs/lib/stomp.js';

// const observer: EventObserver = EventObserver.getInstance();
let client: any;

export class SocketRequest {
  type: string;
  serviceName: string;
  modelName: string;
  actionName: string;
  actionParameters: ActionParameters | undefined;
  token: string | null;
  tokenUst: string | null;
  uuid: string;
  actionResult: ActionResult;
  actionError: ActionError;
  options: any;
  receivedItems: object[] | string | object;
  userName: string;
  password: string;
  channelParameters: RoutingKeyParams | undefined;

  constructor(
    userName: string,
    password: string,
    microserviceName: string,
    modelName: string,
    actionName: string,
    actionParameters?: ActionParameters,
    channelParameters?: RoutingKeyParams
  ) {
    this.type = 'action';
    this.userName = userName;
    this.password = password;
    this.serviceName = microserviceName;
    this.modelName = modelName;
    this.actionName = actionName;
    this.channelParameters = channelParameters;
    this.actionParameters = actionParameters;
    this.tokenUst = GlobalVariables.tokenUST;
    this.uuid = uuidv4();
    this.token = null;
    this.options = new GenerateJSON().generateJSONObj(
      this.type,
      this.serviceName,
      this.modelName,
      this.actionName,
      this.actionParameters,
      this.tokenUst,
      this.uuid
    );
    this.actionResult = {} as ActionResult;
    this.actionError = {} as ActionError;
    this.receivedItems = [];
  }

  initSocketConnect() {
    if (GlobalVariables.socketBaseUrl || GlobalVariables.authBaseUrl) {
      let domain: string;
      let options: string;
      let routingKey: string;
      domain = GlobalVariables.socketBaseUrl;
      options = JSON.stringify(this.options);
      routingKey =
        this.serviceName + '.' + this.modelName + '.' + this.actionName + '.' + this.type;
      let topicKey = routingKey.toString();
      let uuid = JSON.parse(options).uuid;
      client = Stomp.client('ws://' + domain + ':15674/ws');
      const on_connect = (x: any) => {
        client.send('/topic/' + topicKey, { 'content-type': 'text/plain' }, options);
        let rabbitConnection = client.subscribe(
          '/queue/' + uuid,
          (message: any) => {
            if (message.body) {
              let result = JSON.parse(message.body);
              let actionName = result.action_message.action_name;
              let modelName = result.action_message.model_name;
              if (result.type === 'action_result') {
                const actionResult = new ActionResult(result.data).getData();
                // observer.broadcast(actionResult, actionName, modelName);
              } else if (result.type === 'action_error') {
                const actionError = new ActionError(result.message, result.code).getMessage();
                // observer.broadcast(actionError, 'error', modelName);
              }
            } else {
              const actionError = new ActionError('got empty message').getMessage();
              // observer.broadcast(actionError, 'error', this.modelName);
            }
            message.ack();
          },
          { ack: 'client' }
        );
        if (this.channelParameters) {
          let eventConnection = client.subscribe(
            '/topic/' + topicKey,
            (message: any) => {
              if (message.body) {
                let result = JSON.parse(message.body);
                // observer.broadcast(
                //   result.parameters.attributes,
                //   result.action_name,
                //   result.model_name
                // );
                message.ack();
              } else {
                const actionError = new ActionError('got empty message').getMessage();
                // observer.broadcast(actionError, 'error', this.modelName);
              }
            },
            { ack: 'client' }
          );
        }
      };
      const on_error = (error: any) => {
        const actionError = new ActionError(error).getMessage();
        // observer.broadcast(actionError, 'error', this.modelName);
      };
      client.connect(this.userName, this.password, on_connect, on_error, '/');
    } else {
      const actionError = new ActionError('Укажите URL!', 100);
      this.receivedItems = actionError.getMessage();
      // observer.broadcast(this.receivedItems, 'error', this.modelName);
    }
  }
}
