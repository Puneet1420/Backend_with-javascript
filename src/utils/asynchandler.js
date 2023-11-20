
const asynchandler = (requeshandler) => {
   return (req, res , next) => {
        Promise.resolve(requeshandler(req, res, next)).catch(
            (err) => next (err)
        )
    }
}

export {asynchandler} 