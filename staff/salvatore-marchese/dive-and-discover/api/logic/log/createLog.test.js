import 'dotenv/config'
import db from 'dat'
import createLog from './createLog.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        // Return the promise from createLog directly and handle it properly
        return createLog(
            '67503f6a10182798c1418773',   
            '01/09/2024',
            '18mt',                       
            '45min',                      
            'Sunny',                      
            24,                           
            'Good',                       
            'Low',                        
            '5mm',                        
            '6kg',                        
            '12L',                        
            '200',                        
            'Amazing',                    'Tossa Divers',                    
            'Tossa de Mar',                    
            'First dive in Costa Brava, perfect' 
        )
        .then(result => {
            console.log('Log created successfully:', result)  // Log the success result
        })
        .catch(error => {
            console.error('Error creating log:', error) // Handle any errors
        })
    })
    .catch(error => {
        console.error('Error connecting to the database:', error)  // Database connection error
    })
    .finally(() => db.disconnect())  // 