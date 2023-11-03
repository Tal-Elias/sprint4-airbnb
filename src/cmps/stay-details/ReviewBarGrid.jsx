import { Line } from 'rc-progress';

export function ReviewBarGrid() {

    const reviewTags = [
        'Cleanliness',
        'Communication',
        'Check-in',
        'Accuracy',
        'Location',
        'Value'
    ]
    return (
        <section className='review-bar-grid flex column'>
            {reviewTags.map((tag, idx) => {
                return (
                    <div key={idx} className='tag-container flex align-center'>
                        <span className='tag-name'>{tag}</span>
                        <div className='progress-bar-container flex align-center'>
                            <Line className='progress-bar' percent={100} strokeWidth={3.3} strokeColor="#222222" />
                            <span className='average-score'>5.0</span>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}