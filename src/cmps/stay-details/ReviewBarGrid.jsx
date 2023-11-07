import { Line } from 'rc-progress';

export function ReviewBarGrid({ reviews }) {
    const totalRating = reviews.reduce((acc, review) => acc + review.rate, 0)
    const averageRating = totalRating / reviews.length

    const reviewTags = [
        'Cleanliness',
        'Communication',
        'Check-in',
        'Accuracy',
        'Location',
        'Value'
    ];

    return (
        <section className='review-bar-grid flex column'>
            {reviewTags.map((tag, idx) => {
                const dynamicPercentage = ((averageRating / 5) * 100) + (Math.random() * 10 - 5)
                let rating = (dynamicPercentage / 20).toFixed(1)
                if (rating>5) rating = '5.0'
                return (
                    <div key={idx} className='tag-container flex align-center'>
                        <span className='tag-name'>{tag}</span>
                        <div className='progress-bar-container flex align-center'>
                            <Line
                                className='progress-bar'
                                percent={dynamicPercentage}
                                strokeWidth={3.3}
                                strokeColor="#222222"
                            />
                            <span className='average-score'>{rating}</span>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
