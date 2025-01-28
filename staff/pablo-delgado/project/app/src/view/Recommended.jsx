import React from 'react';

const Recommended = ({ centers }) => {
    return (
        <section className="recommendations my-6">
            <h2 className="text-xl font-bold">Recomendado</h2>
            <div className="overflow-x-auto flex gap-4 px-4">
                {centers.map(center => (
                    <div
                        key={center._id}
                        className="bg-cover text-white p-4 rounded-lg shadow w-40"
                        style={{
                            backgroundImage: `url(${center.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <p className="text-center font-bold">{center.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Recommended;
