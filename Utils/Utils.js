export class Utils{
    static clamp(a, min = 0, max = 1){
        return Math.min(max, Math.max(min, a))
    }

    static invlerp(x, y, a){
        return Utils.clamp((a - x) / (y - x));
    }

    static between(stat, min ,max){
        return stat >= min && stat <= max
    }

    // Manhattan distance
    static distance(x0,y0,x1,y1){
        return Math.abs(x1-x0) + Math.abs(y1-y0)
    }

    static weightedRandom(options) {
        if(!options.length) return null

        let i
        let weights = [options[0].weight];
    
        for (i = 1; i < options.length; i++)
            weights[i] = options[i].weight + weights[i - 1];
        
        let random = Math.random() * weights[weights.length - 1];
        
        for (i = 0; i < weights.length; i++)
            if (weights[i] > random)
                break;
        
        return options[i];
    }
}