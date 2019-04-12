import * as React from 'react';
import { cn } from '@bem-react/classname';

import './NewsCommentsCurtain.scss';

const cls = cn('news-comments-curtain');

export enum Mode {
    FOLDED = 'folded',
    PREVIEW = 'preview',
    OPEN = 'fullscreen'
}

export interface IProps {}
export interface IState {
    mode: Mode;
}

export class NewsCommentsCurtain extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { mode: Mode.OPEN };
    }

    private scroll: number = window.pageYOffset;

    componentDidMount() {
        const { mode } = this.state;

        if (mode === Mode.OPEN) {
            this.disableBodyScroll();
        }
    }

    handleClick = () => {
        const { mode } = this.state;

        switch (mode) {
            case Mode.FOLDED:
                this.open();
                break;

            case Mode.OPEN:
                this.fold();
                break;
        
            default:
                break;
        }
    }

    open = () => {
        this.setState({ mode: Mode.OPEN });
        this.disableBodyScroll();
    }

    fold = () => {
        this.setState({ mode: Mode.FOLDED });
        this.enableBodyScroll();
    }

    disableBodyScroll = () => {
        this.scroll = window.pageYOffset;
        document.body.style.top = `${-this.scroll}px`;
        document.body.classList.add('page_curtain_open');
    }

    enableBodyScroll = () => {
        document.body.classList.remove('page_curtain_open');
        window.scrollTo(0, this.scroll);
    }

    render() {
        const { mode } = this.state; 

        return (
            <div className={cls({mode})} onClick={this.handleClick}>
                Шторка
            </div>
        );
    }
}
