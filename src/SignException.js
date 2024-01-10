
function SignException(msg,status="") {
    this.name = "SignException";
    this.message = msg;
    this.status = status;
}
SignException.prototype = Error.prototype;
module.exports={
    SignException
}

