import React from 'react';

const Featured = ({ services }) => {
    return (
        <section className="featured-services my-6">
            <h2 className="text-xl font-bold">Servicios destacados</h2>
            <div className="overflow-x-auto flex gap-4 px-4">
                {services.map(service => (
                    <div
                        key={service._id}
                        className="service-item bg-cover text-white p-4 rounded-lg shadow w-40"
                        style={{
                            backgroundImage: `url(${service.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <p className="text-center font-bold">{service.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Featured;
