import react from 'react'
import ReactPaginate from "react-paginate";
import React from "react";
import {PaginatorProps} from "../types/PaginatorProps";

function Paginator(props : PaginatorProps):JSX.Element{
    const pages : number = props.pages;
    return (
        <div className="row">
            <div className="col-md-8 offset-md-2  mt-1 mw-100">
                <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Siguiente'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={props.onClickPage}
                    containerClassName={'pagination'}
                    pageLinkClassName={"btn btn-primary ml-1"}
                    activeLinkClassName={'btn btn-success'}
                    activeClassName={'active'}
                    nextClassName={"ml-2"}
                    previousClassName={"mr-2"}
                    nextLinkClassName={"btn btn-info"}
                    previousLinkClassName={"btn btn-info"}
                />
            </div>
        </div>
    )
}
export default Paginator;