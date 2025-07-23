type Props = {
  title: string;
  location: string;
  image: string;
};

const VenueCard = ({ title, location, image }: Props) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white hover:scale-105 transition-transform">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-3">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
};

export default VenueCard;