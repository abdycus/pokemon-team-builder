type PokemonCardProps = {
    name: string;
    type: string;
    image: string;
};

export default function PokemonCard({ name, type, image }: PokemonCardProps) {
    return (
        <div>
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>Type: {type}</p>
        </div>
    );
}
