import { utilService } from "../../services/util.service"

export function ReviewPreview({review , isModal, ShowAllReviews}) {
    function LongTxt(txt, length = 170) {
        const displayText = (txt.length > length && !isModal) ? txt.slice(0, length) + '...' : txt
        return displayText
    }
    return (
        <div className="review-preview">
            <div style={{ marginBlockEnd: '40px' }}>
                <div className="preview-header flex align-center">
                    <img style={{ width: '40px', borderRadius: '2em' }} src={review.by.imgUrl} alt="" />
                    <div className="flex column align-center">
                        <h3>{review.by.fullname}</h3>
                        <span>{utilService.getMonthYear(review.at)}</span>
                    </div>
                </div>
                <div className="review-body">
                    <div className="review-txt">{LongTxt(review.txt, 170)}</div>
                    {review.txt.length > 170 && !isModal && <button className="btn underline show-more" onClick={ShowAllReviews}>Show more
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentColor', strokeWidth: 5.33333, overflow: 'visible' }}><path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path></svg>
                    </button>}
                </div>
            </div>
        </div>


    )
}