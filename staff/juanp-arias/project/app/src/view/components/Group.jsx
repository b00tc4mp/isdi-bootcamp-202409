import logic from '../../logic'
import useContext from '../useContext'
import { useState, useEffect } from 'react'
import { errors } from 'com'
import { SectionContainer, SectionHeader } from './index'
import { Label, Input, Field } from '../library'

const { SystemError } = errors
export default function Group({ group }) {
    const { name, teacher, students } = group

    return <main>
        <div className='border border-gray-300 rounded-lg shadow-md p-4 hover:bg-blue-100 cursor-pointer'>
            <h4 className='text-xl font-bold text-blue-600 mb-4'>{name}</h4>
            <h5 className='text-md font-semibold text-gray-700 mb-4'>Teacher: {teacher.name}</h5>
            <div className='mt-4'>
                <h6 className='text-sm font-bold text-gray-600 mb-2'>Students:</h6>
                <ul className='list-disc list-inside space-y-2'>
                    {students.map((student) => (
                        <li key={student.id} className='text-sm text-gray-800 flex justify-between items-center'><span>{student.name}</span>                           <span className='text-xs font-medium text-gray-500'>{student.role}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </main>
}