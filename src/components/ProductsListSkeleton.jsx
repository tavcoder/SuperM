export default function ProductsListSkeleton() {
    return (
        <div className="products-list__grid">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="product-skeleton">
                    <div className="product-skeleton__image"></div>
                    <div className="product-skeleton__name"></div>
                    <div className="product-skeleton__price"></div>
                </div>
            ))}
        </div>
    );
}