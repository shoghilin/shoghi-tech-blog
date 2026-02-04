---
title: "AWS EKS 成本優化：從理論到 CDK 實作"
description: "探討如何透過 Spot Instances 與 Auto Scaling 降低 EKS 運維成本。"
pubDate: 2026-02-03
author: "Shoghi Lin"
tags: ["AWS", "EKS", "CDK"]
---

## 為什麼要優化 EKS 成本？

在處理 Dify 技術支援時，我們常發現 K8s 叢集的閒置資源是最大的浪費。根據成本估算公式：

$$
TotalCost = \sum_{i=1}^{n} (InstancePrice_i \times Time_i) + EBS + LoadBalancer
$$

透過 AWS CDK，我們可以輕鬆將 Data Plane 轉向 Spot Instances。

### CDK 代碼片段
```typescript
cluster.addAutoScalingGroupCapacity('SpotCapacity', {
  instanceType: new ec2.InstanceType('t3.medium'),
  spotPrice: '0.015',
  minCapacity: 1,
});