# How to Embed Testimonials

Add the following code to your website where you want to display testimonials:

```html
<testimonial-wall
  form="your-form-slug"
  theme="dark"
  layout="masonry"
></testimonial-wall>

<script src="http://localhost:3000/embed/testimonial-wall.js"></script>
```

## Configuration Options

- `form`: Your form slug (required)
- `theme`: Choose between `"dark"` or `"light"` (default: `"light"`)
- `layout`: Choose between `"masonry"`, `"grid"`, or `"list"` (default: `"masonry"`)

## Example

```html
<!-- Dark theme with masonry layout -->
<testimonial-wall
  form="cool-tech-design"
  theme="dark"
  layout="masonry"
></testimonial-wall>

<!-- Light theme with grid layout -->
<testimonial-wall
  form="cool-tech-design"
  theme="light"
  layout="grid"
></testimonial-wall>

<!-- List layout -->
<testimonial-wall form="cool-tech-design" layout="list"></testimonial-wall>
```

## Important Notes

1. Replace `http://localhost:3000` with your actual domain when deploying to production
2. Make sure to use the correct form slug that matches your form
3. The script should be loaded after the testimonial-wall element
