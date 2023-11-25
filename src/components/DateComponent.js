import React from "react"

export default function DateComponent({ date, className }) {
    return (
        <div className={className}>
            {new Date(date).toLocaleString('uk-UA', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            })
            }
        </div>
    )
}