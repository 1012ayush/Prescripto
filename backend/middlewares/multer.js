import multer from 'multer'

const storage = multer.diskStorage({
    filename: function(req, file, callback){ // it tells multer what to name the file incoming request from the frontend ,file: An object containing info about the file (like its size and type
        callback(null, file.originalname) //callback(null, file.originalname): The null means "there are no errors." file.originalname tells Multer to save the file using the exact same name the user had on their computer
    }
})

const upload = multer({storage})

export default upload