import React from 'react';
import classNames from "classnames";
import 'components/InterviewerListItem.scss'

export default function InterviewerListItem(props) {
  const interviewersClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  return(
    <li className={interviewersClass} onClick={props.onChange}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  )
}