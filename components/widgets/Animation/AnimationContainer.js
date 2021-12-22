import React from 'react'

const AnimationContainer = (props) => {
    const { children } = props
    return (
        <>
            <div>
                <div className="bg-grey-50 min-h-screen flex items-center justify-center px-16 animate">
                    <div className="relative w-full max-w-lg">

                        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>

                        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2s"></div>

                        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4s"></div>

                        <div className="relative">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnimationContainer
