import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Button,
    Hr,
    Row,
    Column,
    Preview,
} from "@react-email/components";

export function WithdrawalRequestEmail({
    interviewerName,
    interviewerEmail,
    credits,
    platformFee,
    netAmount,
    paymentMethod,
    paymentDetail,
    reviewUrl,
}) {
    const formatCurrency = (amount) => `$${Number(amount).toFixed(2)}`;

    return (
        <Html>
            <Head />
            <Preview>
                New Withdrawal Request From {interviewerName} · {credits}{" "}
                Credits
            </Preview>

            <Body style={styles.body}>
                <Container style={styles.container}>
                    {/* Header */}
                    <Section style={styles.header}>
                        <Text style={styles.logo}>
                            MockMate<span style={{ color: "#F5B942" }}>.</span>
                        </Text>
                        <Text style={styles.headerLabel}>
                            ADMIN NOTIFICATION
                        </Text>
                    </Section>

                    {/* Main Content */}
                    <Section style={styles.content}>
                        <Section style={styles.iconWrapper}>
                            <Text style={styles.icon}>↗</Text>
                        </Section>

                        <Text style={styles.eyebrow}>PAYOUT MANAGEMENT</Text>

                        <Text style={styles.title}>
                            New withdrawal
                            <br />
                            request received.
                        </Text>

                        <Text style={styles.description}>
                            A New Withdrawal Request Has Been Submitted By An
                            Interviewer. Review The Details Below And Take The
                            Appropriate Action.
                        </Text>

                        {/* Interviewer Details */}
                        <Section style={styles.profileCard}>
                            <Text style={styles.cardLabel}>REQUESTED BY</Text>

                            <Text style={styles.name}>{interviewerName}</Text>

                            <Text style={styles.email}>{interviewerEmail}</Text>
                        </Section>

                        {/* Payout Summary */}
                        <Section style={styles.amountCard}>
                            <Text style={styles.amountLabel}>
                                NET PAYOUT AMOUNT
                            </Text>

                            <Text style={styles.amount}>
                                {formatCurrency(netAmount)}
                            </Text>

                            <Text style={styles.amountSubtext}>
                                Amount Payable After Platform Fee
                            </Text>

                            <Hr style={styles.cardDivider} />

                            <Row style={styles.detailRow}>
                                <Column>
                                    <Text style={styles.detailLabel}>
                                        Credits Requested
                                    </Text>
                                </Column>
                                <Column align="right">
                                    <Text style={styles.detailValue}>
                                        {credits} Credits
                                    </Text>
                                </Column>
                            </Row>

                            <Row style={styles.detailRow}>
                                <Column>
                                    <Text style={styles.detailLabel}>
                                        Platform Fee (20%)
                                    </Text>
                                </Column>
                                <Column align="right">
                                    <Text style={styles.detailValue}>
                                        -{formatCurrency(platformFee)}
                                    </Text>
                                </Column>
                            </Row>

                            <Row style={styles.detailRow}>
                                <Column>
                                    <Text style={styles.detailLabel}>
                                        Net Payout
                                    </Text>
                                </Column>
                                <Column align="right">
                                    <Text style={styles.netValue}>
                                        {formatCurrency(netAmount)}
                                    </Text>
                                </Column>
                            </Row>
                        </Section>

                        {/* Payment Information */}
                        <Text style={styles.sectionTitle}>
                            Payment Information
                        </Text>

                        <Section style={styles.paymentCard}>
                            <Row style={styles.detailRow}>
                                <Column>
                                    <Text style={styles.detailLabel}>
                                        Payment Method
                                    </Text>
                                </Column>
                                <Column align="right">
                                    <Text style={styles.detailValue}>
                                        {paymentMethod}
                                    </Text>
                                </Column>
                            </Row>

                            <Hr style={styles.cardDivider} />

                            <Text style={styles.detailLabel}>
                                PAYMENT DETAILS
                            </Text>

                            <Text style={styles.paymentDetail}>
                                {paymentDetail}
                            </Text>
                        </Section>

                        {/* Action */}
                        <Section style={styles.actionSection}>
                            <Text style={styles.actionTitle}>
                                Ready To Review?
                            </Text>

                            <Text style={styles.actionDescription}>
                                Verify The Payment Information Before Approving
                                This Withdrawal Request.
                            </Text>

                            <Button href={reviewUrl} style={styles.button}>
                                Review Withdrawal Request →
                            </Button>
                        </Section>

                        <Text style={styles.securityNote}>
                            This Is An Automated Administrative Notification.
                            Please Verify All Payment Details Before Processing
                            Any Payout.
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section style={styles.footer}>
                        <Hr style={styles.footerDivider} />

                        <Text style={styles.footerLogo}>MOCKMATE</Text>

                        <Text style={styles.footerText}>
                            Empowering Better Interviews, One Session At a Time.
                        </Text>

                        <Text style={styles.copyright}>
                            © {new Date().getFullYear()} MockMate. All Rights
                            Reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

const styles = {
    body: {
        backgroundColor: "#08090D",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "40px 12px",
    },
    container: {
        maxWidth: "560px",
        margin: "0 auto",
        backgroundColor: "#111319",
        border: "1px solid #262A34",
        borderRadius: "16px",
        overflow: "hidden",
    },
    header: {
        padding: "28px 36px",
        borderBottom: "1px solid #262A34",
    },
    logo: {
        color: "#F5F5F5",
        fontSize: "25px",
        fontWeight: "800",
        margin: "0",
        letterSpacing: "-1px",
    },
    headerLabel: {
        color: "#858B98",
        fontSize: "10px",
        letterSpacing: "2px",
        margin: "9px 0 0",
    },
    content: {
        padding: "36px",
    },
    iconWrapper: {
        backgroundColor: "#302718",
        border: "1px solid #614820",
        borderRadius: "12px",
        width: "48px",
        textAlign: "center",
    },
    icon: {
        color: "#F5B942",
        fontSize: "26px",
        margin: "5px 0",
    },
    eyebrow: {
        color: "#F5B942",
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "2px",
        margin: "28px 0 12px",
    },
    title: {
        color: "#F9FAFB",
        fontSize: "34px",
        lineHeight: "1.2",
        fontWeight: "700",
        letterSpacing: "-1px",
        margin: "0",
    },
    description: {
        color: "#9CA3AF",
        fontSize: "14px",
        lineHeight: "1.8",
        margin: "18px 0 28px",
    },
    profileCard: {
        backgroundColor: "#191C25",
        border: "1px solid #292E39",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "18px",
    },
    cardLabel: {
        color: "#8B93A3",
        fontSize: "10px",
        letterSpacing: "1.5px",
        fontWeight: "700",
        margin: "0 0 12px",
    },
    name: {
        color: "#F9FAFB",
        fontSize: "17px",
        fontWeight: "700",
        margin: "0 0 5px",
    },
    email: {
        color: "#9CA3AF",
        fontSize: "13px",
        margin: "0",
    },
    amountCard: {
        backgroundColor: "#191C25",
        border: "1px solid #3D3423",
        borderRadius: "10px",
        padding: "22px",
        marginBottom: "30px",
    },
    amountLabel: {
        color: "#A3A3A3",
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "1.5px",
        margin: "0 0 12px",
    },
    amount: {
        color: "#F5B942",
        fontSize: "38px",
        fontWeight: "700",
        letterSpacing: "-1px",
        margin: "0",
    },
    amountSubtext: {
        color: "#858B98",
        fontSize: "12px",
        margin: "8px 0 20px",
    },
    cardDivider: {
        borderColor: "#303541",
        margin: "18px 0",
    },
    detailRow: {
        marginBottom: "13px",
    },
    detailLabel: {
        color: "#9CA3AF",
        fontSize: "12px",
        margin: "0",
    },
    detailValue: {
        color: "#F3F4F6",
        fontSize: "12px",
        fontWeight: "600",
        margin: "0",
    },
    netValue: {
        color: "#F5B942",
        fontSize: "13px",
        fontWeight: "700",
        margin: "0",
    },
    sectionTitle: {
        color: "#F9FAFB",
        fontSize: "16px",
        fontWeight: "700",
        margin: "0 0 15px",
    },
    paymentCard: {
        backgroundColor: "#191C25",
        border: "1px solid #292E39",
        borderRadius: "10px",
        padding: "20px",
    },
    paymentDetail: {
        color: "#F9FAFB",
        fontSize: "13px",
        lineHeight: "1.6",
        margin: "8px 0 0",
        wordBreak: "break-word",
    },
    actionSection: {
        marginTop: "34px",
        textAlign: "center",
    },
    actionTitle: {
        color: "#F9FAFB",
        fontSize: "19px",
        fontWeight: "700",
        margin: "0 0 9px",
    },
    actionDescription: {
        color: "#9CA3AF",
        fontSize: "13px",
        lineHeight: "1.7",
        margin: "0 0 22px",
    },
    button: {
        backgroundColor: "#F5B942",
        borderRadius: "8px",
        color: "#111319",
        display: "block",
        fontSize: "14px",
        fontWeight: "700",
        padding: "15px 20px",
        textDecoration: "none",
        textAlign: "center",
    },
    securityNote: {
        color: "#737B89",
        fontSize: "11px",
        lineHeight: "1.7",
        textAlign: "center",
        margin: "26px 0 0",
    },
    footer: {
        padding: "0 36px 30px",
        textAlign: "center",
    },
    footerDivider: {
        borderColor: "#262A34",
        margin: "0 0 25px",
    },
    footerLogo: {
        color: "#F5B942",
        fontSize: "11px",
        fontWeight: "800",
        letterSpacing: "3px",
        margin: "0 0 10px",
    },
    footerText: {
        color: "#858B98",
        fontSize: "11px",
        margin: "0 0 15px",
    },
    copyright: {
        color: "#626978",
        fontSize: "10px",
        margin: "0",
    },
};
