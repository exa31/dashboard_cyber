export default function Pagination({ total, currentPage, setCurrentPage }: { total: number, currentPage: number, setCurrentPage: (page: number) => void }) {
    return (
        <div className="join">
            {
                Array.from({ length: total }).map((_, index) => {
                    return (
                        <button key={index + 100} onClick={() => setCurrentPage(index + 1)} className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}>{index + 1}</button>
                    )
                })
            }
        </div>
    )
};