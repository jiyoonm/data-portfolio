import Link from "next/link";
import Image from "next/image";
export default function ProjectCard({ info }) {
  return (
    <Link
      href={`/projects/${info.slug}`}
      className="flex gap-4 items-start  bg-primary rounded-lg p-10"
    >
      <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        {info.thumb ? (
          <Image
            src={info.thumb}
            alt={info.name}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-sm opacity-60">
            No image
          </div>
        )}
      </div>

      <div className="min-w-0">
        <h2 className="text-lg font-medium truncate">{info.name}</h2>
        {info.year ? <p className="text-sm opacity-70">{info.year}</p> : null}
        {info.description ? (
          <p className="mt-1 text-sm line-clamp-2">{info.description}</p>
        ) : null}
        {info.technologies?.length ? (
          <div className="mt-2 flex gap-2 flex-wrap">
            {info.technologies.map((t) => (
              <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
