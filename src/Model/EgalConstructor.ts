import {Model} from "./Model";
import {EventObserver} from "../Actions/NetworkRequests/SocketConnection/Observer";


export class EgalConstructor extends Model {
    private readonly egalModel: Model
    private egalObserver: EventObserver = EventObserver.getInstance()
    modelName: string
    userName: string
    password: string
    private readonly url: string
    private readonly connectionType: string
    listenerFunction: Function

    constructor(modelParams: { modelName: string, userName: string, password: string, url: string, connectionType: string, listenerFunction: Function}) {
        super(modelParams.modelName, modelParams.userName, modelParams.password)
        this.modelName = modelParams.modelName
        this.userName = modelParams.userName
        this.password = modelParams.password
        this.url = modelParams.url
        this.connectionType = modelParams.connectionType
        this.listenerFunction = modelParams.listenerFunction
        this.egalModel = new Model(this.modelName, this.userName, this.password)
        this.initModel()
    }

    initModel() {
        this.egalModel.setBaseUrl(this.url, this.connectionType)
        return this.egalModel
    }
    initModelObserver() {
        this.egalObserver.subscribe(
            this.modelName,
            (data: any, actionName: string, modelName: string, actionMessage: object) => {
                const receivedData = [data[0], actionName, modelName, actionMessage];
                this.listenerFunction(receivedData);
            },
        );
    }
}
