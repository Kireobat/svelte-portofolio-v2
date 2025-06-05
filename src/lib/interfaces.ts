export interface TimelineItemInterface {
    date: string;
    title: string;
    description: string;
    link?: string;
    linkText?: string;
}

export interface TimelineInterface {
    data: TimelineItemInterface[];
}
