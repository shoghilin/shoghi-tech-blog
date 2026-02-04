---
title: "AWS EKS コスト最適化：理論から CDK 実装まで"
description: "Spot Instance と Auto Scaling を活用して EKS の運用コストを削減する方法について。"
pubDate: 2026-02-03
author: "Shoghi Lin"
tags: ["AWS", "EKS", "CDK"]
---

## なぜ EKS のコストを最適化するのか？

Dify の技術サポートを担当している中で、K8s クラスターのアイドルリソースが最大の無駄であることをよく目にします。コスト計算の基本式は以下の通りです：

$$
TotalCost = \sum_{i=1}^{n} (InstancePrice_i \times Time_i) + EBS + LoadBalancer
$$

AWS CDK を使用すると、データプレーン（Data Plane）を簡単に Spot Instance に移行し、コストを大幅に削減することが可能です。

### CDK コードスニペット
```typescript
cluster.addAutoScalingGroupCapacity('SpotCapacity', {
  instanceType: new ec2.InstanceType('t3.medium'),
  spotPrice: '0.015',
  minCapacity: 1,
});