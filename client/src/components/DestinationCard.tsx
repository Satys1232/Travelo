import { Link } from "wouter";

interface DestinationCardProps {
  name: string;
  slug: string;
  imageUrl: string;
}

export function DestinationCard({ name, slug, imageUrl }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${slug}`}>
      <a className="block group" data-testid={`link-destination-${slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Destination Name */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wide" data-testid={`text-destination-${slug}`}>
              {name}
            </h3>
          </div>
        </div>
      </a>
    </Link>
  );
}
