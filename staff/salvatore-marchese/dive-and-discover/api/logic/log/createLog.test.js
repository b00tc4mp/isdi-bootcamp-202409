import 'dotenv/config'
import db from 'dat'
import createLog from './createLog.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        // Return the promise from createLog directly and handle it properly
        return createLog(
            '674f154514ef7991f1a0ee64',   
            '09/11/2024',
            '18',                       
            '45',                      
            'Sunny',                      
            24,                           
            'Good',                       
            'Low',                        
            '5',                        
            '6',                        
            '12',                        
            '200',                        
            'Amazing',                    
            'Tossa Divers',                    
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