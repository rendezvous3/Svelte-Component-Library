<script lang="ts">
  import Button from '../Button/Button.svelte';

  interface ProductCardProps {
    image: string;
    title: string;
    price: number;
    originalPrice?: number;
    rating?: number;
    discount?: number;
    onAddToCart?: () => void;
  }

  let {
    image,
    title,
    price,
    originalPrice,
    rating,
    discount,
    onAddToCart
  }: ProductCardProps = $props();

  let hasDiscount = $derived(discount !== undefined && discount > 0);
  let displayPrice = $derived(
    hasDiscount && originalPrice ? originalPrice : price
  );
  let finalPrice = $derived(price);

  function formatPrice(value: number): string {
    return `$${value.toFixed(2)}`;
  }

  function handleAddToCart() {
    onAddToCart?.();
  }
</script>

<div class="product-card">
  <div class="product-card__image-wrapper">
    <img src={image} alt={title} class="product-card__image" />
    {#if hasDiscount}
      <span class="product-card__badge">-{discount}%</span>
    {/if}
  </div>
  
  <div class="product-card__content">
    <h3 class="product-card__title">{title}</h3>
    
    {#if rating !== undefined}
      <div class="product-card__rating">
        {#each Array(5) as _, i}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
            stroke="currentColor"
            stroke-width="1.5"
            xmlns="http://www.w3.org/2000/svg"
            class="product-card__star"
          >
            <path
              d="M7 1L8.854 5.146L13 6.146L10 9.146L10.708 13.292L7 11.146L3.292 13.292L4 9.146L1 6.146L5.146 5.146L7 1Z"
            />
          </svg>
        {/each}
        <span class="product-card__rating-value">{rating.toFixed(1)}</span>
      </div>
    {/if}
    
    <div class="product-card__pricing">
      <span class="product-card__price">{formatPrice(finalPrice)}</span>
      {#if hasDiscount && originalPrice}
        <span class="product-card__original-price">{formatPrice(originalPrice)}</span>
      {/if}
    </div>
    
    <Button
      label="Add to Cart"
      variant="primary"
      size="sm"
      onclick={handleAddToCart}
      fullWidth={true}
    />
  </div>
</div>

<style>
  .product-card {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-out;
    cursor: pointer;
    max-width: 280px;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  /* Image wrapper */
  .product-card__image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 75%;
    background: #f3f4f6;
    overflow: hidden;
  }

  .product-card__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-out;
  }

  .product-card:hover .product-card__image {
    transform: scale(1.05);
  }

  /* Discount badge */
  .product-card__badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #ef4444;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  }

  /* Content */
  .product-card__content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* Title */
  .product-card__title {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin: 0;
    line-height: 1.4;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Rating */
  .product-card__rating {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .product-card__star {
    color: #fbbf24;
    width: 14px;
    height: 14px;
  }

  .product-card__rating-value {
    font-size: 12px;
    color: #6b7280;
    margin-left: 4px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  }

  /* Pricing */
  .product-card__pricing {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .product-card__price {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  }

  .product-card__original-price {
    font-size: 14px;
    color: #9ca3af;
    text-decoration: line-through;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  }

  /* Button wrapper */
  .product-card :global(.btn) {
    margin-top: 4px;
  }
</style>

