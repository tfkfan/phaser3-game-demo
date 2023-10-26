export enum Direction {
    UP = "up",
    RIGHT = "right",
    DOWN = "down",
    LEFT = "left"
}

export function valueOf(str: string) {
    return Direction[str.toUpperCase() as keyof typeof Direction]
}