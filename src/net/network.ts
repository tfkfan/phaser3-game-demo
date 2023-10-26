export type OnMessageHandler = (eventData: any) => void;

export const MessageType = {
    UPDATE: 1,
    PLAYER_MOUSE_MOVE: 2
}
export default class Network {
    private socket: any;
    private events: Map<number, [any, OnMessageHandler]> = new Map<number, [any, OnMessageHandler]>()

    constructor() {
        if (!window.WebSocket) {
            // @ts-ignore
            window.WebSocket = window.MozWebSocket;
        }
    }

    public initConnection(host:string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (window.WebSocket) {
                this.socket = new WebSocket(`ws://${host}/websocket`);
            } else {
                reject("Your browser does not support Web Socket.");
            }

            this.socket.addEventListener('open', (event) => {
                resolve("Connection established")
            });

            this.socket.addEventListener('error', (event) => {
                reject(event.message);
            });

            this.socket.addEventListener('close', (event) => {
                reject("Web Socket closed");
            });

            this.socket.addEventListener('message', (evt) => {
                const eventData = JSON.parse(evt.data);
                if (this.events.has(eventData.type)) {
                    const arr = this.events.get(eventData.type)
                    arr[1].call(!arr[0] ? arr[0] : this, eventData.data);
                }
            });
        })
    }

    public on(type: number, handler: OnMessageHandler, thisArg: any = null) {
        this.events.set(type, [thisArg, handler]);
    }

    public send(type: number, data: any = null) {
        if (this.socket.readyState !== WebSocket.OPEN) {
            console.log("Socket is not ready");
            return;
        }

        this.socket.send(this.createEvent(type, data));
    }

    private createEvent = (eventType: number, payload: any = null) => {
        const obj: any = {
            type: eventType,
            data: null
        };
        if (payload) {
            obj.data = payload
        }
        return JSON.stringify(obj);
    }
}

export const network = new Network();
