export interface ApiResponse<T = null> {
    error: SolutionError;
    result: T;
}

export interface SolutionInfo {
    name: string;
    script: string;
};

export interface ResultInfo {
    name: string;
    output: string;
    cpuTime: string;
    memory: string;
}

export interface SolutionError {
    message: string;
    validationErrors?: { [key: string]: string };
}