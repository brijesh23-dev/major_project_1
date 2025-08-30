class ExpressError extends Error {
    constructor(Status,message){
        super();
        this.Status = Status;
        this.message = message;
    }
}

module.exports = ExpressError;