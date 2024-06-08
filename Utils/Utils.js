export class Utils{
    static clamp(a, min = 0, max = 1){
        return Math.min(max, Math.max(min, a))
    }

    static between(stat, min ,max){
        return stat >= min && stat <= max
    }

    // Manhattan distance
    static distance(x0,y0,x1,y1){
        return Math.abs(x1-x0) + Math.abs(y1-y0)
    }
}